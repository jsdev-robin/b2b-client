import { useMemo } from 'react';

type Value = { name: string };

type Option<T extends string = string> = {
  name: T;
  values: Value[];
};

type Variant<T extends string = string> = {
  title: string;
  optionValues: {
    name: T;
    value: string;
  }[];
};

export function useVariants<T extends string>(
  options: Option<T>[],
): Variant<T>[] {
  return useMemo(() => {
    const combine = (
      index: number,
      current: { name: T; value: string }[],
    ): Variant<T>[] => {
      if (index === options.length) {
        return [
          {
            title: current.map((v) => v.value).join(' / '),
            optionValues: current,
          },
        ];
      }

      const option = options[index];

      return option.values.flatMap((v) =>
        combine(index + 1, [...current, { name: option.name, value: v.name }]),
      );
    };

    return combine(0, []);
  }, [options]);
}
