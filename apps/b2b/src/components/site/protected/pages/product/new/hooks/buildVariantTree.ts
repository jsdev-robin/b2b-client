type OptionValue<T extends string = string> = {
  name: T;
  value: string;
};

type Variant<T extends string = string> = {
  title: string;
  optionValues: OptionValue<T>[];
};

type VariantTree<T> = {
  [key: string]: VariantTree<T> | T;
};

export function buildVariantTree<T extends Variant>(
  variants: T[],
): VariantTree<T> {
  const root: VariantTree<T> = {};

  for (const variant of variants) {
    let node: VariantTree<T> = root;

    variant.optionValues.forEach((opt, index) => {
      const key = opt.value;

      if (index === variant.optionValues.length - 1) {
        node[key] = variant;
        return;
      }

      node[key] ??= {};
      node = node[key] as VariantTree<T>;
    });
  }

  return root;
}
