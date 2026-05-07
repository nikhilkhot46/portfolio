export default function Link({
  href,
  prefetch,
  replace,
  scroll,
  shallow,
  locale,
  passHref,
  legacyBehavior,
  ...rest
}) {
  const target = typeof href === 'string' ? href : href?.pathname ?? '#'
  return <a href={target} {...rest} />
}
