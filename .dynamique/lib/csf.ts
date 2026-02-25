/**
 * CSF (Component Story Format) utilities.
 * Detect Storybook CSF modules, extract stories, and infer argTypes.
 */

export function isReactComponent(val: unknown): boolean {
  if (typeof val === 'function') return true;
  if (val && typeof val === 'object' && (val as any).$$typeof) return true;
  return false;
}

/**
 * Detect if a module uses Storybook CSF format.
 * CSF: default export is an object with { component } or { render }.
 */
export function isCSF(exports: Record<string, any>): boolean {
  const def = exports.default;
  return (
    def &&
    typeof def === 'object' &&
    !Array.isArray(def) &&
    (isReactComponent(def.component) || typeof def.render === 'function')
  );
}

export interface StoryEntry {
  name: string;
  args: Record<string, any>;
  render?: (args: Record<string, any>) => any;
}

/**
 * Extract stories from CSF named exports.
 * Returns [{ name, args, render? }] with each story's args merged with meta.args.
 */
export function extractStories(
  exports: Record<string, any>,
  metaArgs: Record<string, any>,
): StoryEntry[] {
  const stories: StoryEntry[] = [];
  for (const [key, val] of Object.entries(exports)) {
    if (key === 'default' || key.startsWith('_')) continue;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      stories.push({
        name: key,
        args: { ...metaArgs, ...(val.args || {}) },
        render: typeof val.render === 'function' ? val.render : undefined,
      });
    }
  }
  return stories;
}

/**
 * Infer argTypes from args values when no explicit argTypes are provided.
 * Skips functions (those become actions) and React elements.
 */
export function inferArgTypes(args: Record<string, any>): Record<string, any> {
  const inferred: Record<string, any> = {};
  for (const [key, val] of Object.entries(args)) {
    if (typeof val === 'function') continue;
    if (val && typeof val === 'object' && val.$$typeof) continue;
    if (typeof val === 'boolean') {
      inferred[key] = { control: 'boolean' };
    } else if (typeof val === 'number') {
      inferred[key] = { control: 'number' };
    } else if (typeof val === 'string') {
      inferred[key] = { control: 'text' };
    }
  }
  return inferred;
}
