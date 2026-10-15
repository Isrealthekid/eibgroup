// The viewBox trims empty space without changing the supplied logo artwork.
export default function BrandLogo({ className }) {
  return (
    <svg className={className} viewBox="100 716 2925 444" aria-hidden="true" focusable="false">
      <image href="/brand/eib-group.png" width="3125" height="1875" />
    </svg>
  );
}
