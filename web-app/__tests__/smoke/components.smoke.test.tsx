/**
 * SMOKE TESTS - Component Rendering
 *
 * Test Strategy: Verify all core UI components render without throwing errors.
 * Expected Behavior: Components should render with default props.
 * Risks: Missing props validation, broken imports, styling issues.
 */

import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

describe('Smoke Tests - UI Components', () => {
  describe('Button Component', () => {
    it('should render default button', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should render all variants without crashing', () => {
      const variants = ['default', 'secondary', 'outline', 'ghost', 'link', 'destructive', 'success'] as const;

      variants.forEach((variant) => {
        const { container } = render(<Button variant={variant}>{variant}</Button>);
        expect(container).toBeInTheDocument();
      });
    });

    it('should render all sizes without crashing', () => {
      const sizes = ['default', 'sm', 'lg', 'icon'] as const;

      sizes.forEach((size) => {
        const { container } = render(<Button size={size}>Button</Button>);
        expect(container).toBeInTheDocument();
      });
    });

    it('should render loading state', () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should render disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should render with icon', () => {
      const Icon = () => <svg data-testid="icon" />;
      render(
        <Button>
          <Icon />
          With Icon
        </Button>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('Card Component', () => {
    it('should render Card with all subcomponents', () => {
      render(
        <Card data-testid="card">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>Card Content</CardContent>
          <CardFooter>Card Footer</CardFooter>
        </Card>
      );

      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card Description')).toBeInTheDocument();
      expect(screen.getByText('Card Content')).toBeInTheDocument();
      expect(screen.getByText('Card Footer')).toBeInTheDocument();
    });

    it('should render Card without subcomponents', () => {
      render(<Card data-testid="simple-card">Simple content</Card>);
      expect(screen.getByTestId('simple-card')).toBeInTheDocument();
    });

    it('should accept custom className', () => {
      render(<Card className="custom-class" data-testid="custom-card">Content</Card>);
      expect(screen.getByTestId('custom-card')).toHaveClass('custom-class');
    });
  });

  describe('Input Component', () => {
    it('should render basic input', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('should render input with icon', () => {
      const Icon = () => <svg data-testid="input-icon" />;
      render(<Input icon={<Icon />} placeholder="With icon" />);
      expect(screen.getByTestId('input-icon')).toBeInTheDocument();
    });

    it('should render input with error state', () => {
      render(<Input error="This field is required" placeholder="Error input" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('should render different input types', () => {
      const types = ['text', 'email', 'password', 'number', 'date'] as const;

      types.forEach((type) => {
        const { container } = render(<Input type={type} />);
        expect(container.querySelector(`input[type="${type}"]`)).toBeInTheDocument();
      });
    });

    it('should render disabled input', () => {
      render(<Input disabled placeholder="Disabled" />);
      expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
    });

    it('should render required input', () => {
      render(<Input required placeholder="Required" />);
      expect(screen.getByPlaceholderText('Required')).toBeRequired();
    });
  });
});
