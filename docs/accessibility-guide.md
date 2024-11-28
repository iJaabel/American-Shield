# React Accessibility Implementation Guide

## 1. Essential ARIA Attributes and Roles

### Common Use Cases

#### Navigation Menus
```tsx
// Good Example
<nav role="navigation" aria-label="Main navigation">
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <a 
          href={item.href}
          aria-current={isCurrentPage ? "page" : undefined}
        >
          {item.label}
        </a>
      </li>
    ))}
  </ul>
</nav>
```

#### Modal Dialogs
```tsx
<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <DialogTitle id="dialog-title">Important Information</DialogTitle>
  <DialogDescription id="dialog-description">
    This dialog contains important information.
  </DialogDescription>
</Dialog>
```

#### Form Elements
```tsx
<form onSubmit={handleSubmit} aria-label="Contact form">
  <div>
    <label htmlFor="name" id="name-label">Name</label>
    <input
      id="name"
      type="text"
      aria-labelledby="name-label"
      aria-required="true"
      aria-invalid={errors.name ? "true" : "false"}
    />
    {errors.name && (
      <div role="alert" aria-live="polite">
        {errors.name.message}
      </div>
    )}
  </div>
</form>
```

## 2. Keyboard Navigation

### Focus Management
```tsx
const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Trap focus within menu when open
  useEffect(() => {
    if (isOpen) {
      const focusableElements = menuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements?.length) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  return (
    <div ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Menu
      </button>
      {isOpen && (
        <div role="menu">
          {/* Menu items */}
        </div>
      )}
    </div>
  );
};
```

### Keyboard Event Handling
```tsx
const Tabs = ({ items }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
        setSelectedTab((prev) => 
          prev === items.length - 1 ? 0 : prev + 1
        );
        break;
      case 'ArrowLeft':
        setSelectedTab((prev) => 
          prev === 0 ? items.length - 1 : prev - 1
        );
        break;
    }
  };

  return (
    <div role="tablist">
      {items.map((item, index) => (
        <button
          key={item.id}
          role="tab"
          aria-selected={selectedTab === index}
          aria-controls={`panel-${item.id}`}
          onKeyDown={handleKeyDown}
          tabIndex={selectedTab === index ? 0 : -1}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
```

## 3. Testing Methodology

### Tools to Use
- Jest and React Testing Library for component testing
- Axe-core for accessibility violations
- Cypress for end-to-end testing

### Example Test Setup
```tsx
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('Component Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<YourComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be keyboard navigable', () => {
    render(<YourComponent />);
    const button = screen.getByRole('button');
    button.focus();
    expect(document.activeElement).toBe(button);
  });
});
```

## 4. Component-Specific Guidelines

### Navigation Menu
```tsx
const NavigationMenu = () => {
  return (
    <nav aria-label="Main">
      <button
        aria-expanded="false"
        aria-controls="menu-list"
        aria-label="Open menu"
      >
        Menu
      </button>
      <ul
        id="menu-list"
        role="menubar"
        className="hidden md:flex"
      >
        {items.map((item) => (
          <li key={item.id} role="none">
            <a
              href={item.href}
              role="menuitem"
              className="block px-4 py-2"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

### Form Elements
```tsx
const FormField = ({ label, error, ...props }) => {
  const id = useId();
  
  return (
    <div>
      <label 
        htmlFor={id}
        className="block text-sm font-medium"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <div 
          id={`${id}-error`}
          role="alert"
          className="text-red-500 text-sm"
        >
          {error}
        </div>
      )}
    </div>
  );
};
```

### Interactive Widgets
```tsx
const Accordion = ({ items }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id}>
          <button
            aria-expanded={openItem === item.id}
            aria-controls={`content-${item.id}`}
            onClick={() => setOpenItem(
              openItem === item.id ? null : item.id
            )}
            className="w-full text-left p-4"
          >
            {item.title}
          </button>
          <div
            id={`content-${item.id}`}
            role="region"
            aria-labelledby={`heading-${item.id}`}
            hidden={openItem !== item.id}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};
```

## Best Practices Summary

1. Always provide text alternatives for non-text content
2. Ensure proper heading hierarchy
3. Use semantic HTML elements
4. Implement proper focus management
5. Provide sufficient color contrast
6. Make all functionality available via keyboard
7. Add proper ARIA labels and roles
8. Test with screen readers
9. Implement proper error handling
10. Ensure responsive design works with zoom

## Testing Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Proper focus management is implemented
- [ ] ARIA attributes are correctly used
- [ ] Color contrast meets WCAG standards
- [ ] Error messages are announced by screen readers
- [ ] Images have proper alt text
- [ ] Forms have proper labels and error handling
- [ ] Modals trap focus correctly
- [ ] Skip links are implemented for main content
- [ ] Dynamic content updates are announced appropriately