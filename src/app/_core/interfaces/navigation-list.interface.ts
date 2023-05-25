type badge = 'new'|'beta';
export interface NavigationListInterface {
  id?: string;
  site?: boolean;
  seoUrl?: boolean;
  label?: string;
  href?: string;
  routerLink?: string;
  target?: string;
  icon?: string;
  analytic?: string;
  component?: any;
  badges?: [];
  exact?: boolean;
  navs?: [{
    label?: string;
    href?: string;
    icon?: string;
    suffix?: {
      class?: string;
      body?: string;
    }
  }];
}
