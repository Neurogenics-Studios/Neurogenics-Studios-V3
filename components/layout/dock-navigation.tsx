'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type SpringOptions,
} from 'motion/react';
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Briefcase, Layers, BookOpen, User, Mail } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface DockItemData {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}

interface DockItemProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
}

interface DockLabelProps {
  children: ReactNode;
  className?: string;
  isHovered?: ReturnType<typeof useMotionValue<number>>;
}

interface DockIconProps {
  children: ReactNode;
  className?: string;
}

interface DockProps {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
}

// ── DockItem ──────────────────────────────────────────────────────────────────

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) =>
        cloneElement(child as ReactElement<{ isHovered?: typeof isHovered }>, { isHovered })
      )}
    </motion.div>
  );
}

// ── DockLabel ─────────────────────────────────────────────────────────────────

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', (latest: number) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ x: '-50%' } as React.CSSProperties}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── DockIcon ──────────────────────────────────────────────────────────────────

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

// ── Dock (exact React Bits source) ────────────────────────────────────────────

function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div style={{ height, scrollbarWidth: 'none' as const }} className="dock-outer">
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ── DockNavigation (site integration) ─────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: User },
  { label: 'Services', href: '/services', icon: Layers },
  { label: 'Work', href: '/work', icon: Briefcase },
  { label: 'Blog', href: '/blog', icon: BookOpen },
  { label: 'Contact', href: '/contact', icon: Mail },
];

export function DockNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const items: DockItemData[] = NAV_ITEMS.map(({ label, href, icon: Icon }) => {
    const isActive =
      href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

    return {
      label,
      className: isActive ? 'dock-item--active' : '',
      onClick: () => router.push(href),
      icon: <Icon size={20} strokeWidth={1.5} />,
    };
  });

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <Dock
          items={items}
          panelHeight={62}
          baseItemSize={46}
          magnification={68}
          distance={180}
        />
      </div>
    </div>
  );
}
