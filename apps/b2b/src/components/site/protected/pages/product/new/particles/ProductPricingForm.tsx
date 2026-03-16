'use client';

import { Card, CardContent, CardHeader } from '@repo/ui/components/card';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from '@repo/ui/components/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@repo/ui/components/input-group';
import { ChevronDown, DollarSign } from 'lucide-react';
import { useProductForm } from '../contexts/ProductFormContext';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { ButtonGroup } from '@repo/ui/components/button-group';
import { Checkbox } from '@repo/ui/components/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui/components/collapsible';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import { Label } from '@repo/ui/components/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/ui/components/tooltip';
import React from 'react';
import { useWatch } from 'react-hook-form';
import { usePriceProfit } from '../hooks/usePriceProfit';
import { useProductPricing } from '../hooks/useProductPricing';
import ProductPriceUnit from './ProductPriceUnit';

const ProductPricingForm = () => {
  const { form } = useProductForm();
  const [isOpen, setIsOpen] = React.useState(false);

  const [
    taxable,
    compareAtPrice,
    cost,
    price,
    quantityUnit,
    quantityValue,
    referenceUnit,
    referenceValue,
  ] = useWatch({
    control: form.control,
    name: [
      'variant.taxable',
      'variant.compareAtPrice',
      'variant.inventoryItem.cost',
      'variant.price',
      'variant.unitPriceMeasurement.quantityUnit',
      'variant.unitPriceMeasurement.quantityValue',
      'variant.unitPriceMeasurement.referenceUnit',
      'variant.unitPriceMeasurement.referenceValue',
    ],
  });

  const { profit, margin } = usePriceProfit(+cost, +price);
  const { unitPrice } = useProductPricing({
    price: +price,
    cost: +cost,
    quantityValue: +quantityValue,
    quantityUnit: quantityUnit,
    referenceValue: +referenceValue,
    referenceUnit: referenceUnit,
  });

  return (
    <Card>
      <CardHeader>
        <Field>
          <FormField
            control={form.control}
            name="variant.price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <InputGroup className="max-w-xs">
                    <InputGroupInput
                      type="number"
                      placeholder="0.00"
                      {...field}
                    />
                    <InputGroupAddon>
                      <DollarSign />
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Field>
      </CardHeader>
      <CardContent>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="grid grid-cols-1 gap-4"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between gap-4">
              {isOpen ? (
                <Label>Additional display prices</Label>
              ) : (
                <ButtonGroup>
                  <ButtonGroup>
                    <Button variant="secondary" type="button" size="sm">
                      Compare at{' '}
                      {compareAtPrice && (
                        <Badge variant="outline">${compareAtPrice}</Badge>
                      )}
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button variant="secondary" type="button" size="sm">
                      Unit price{' '}
                      <Badge variant="outline">
                        $
                        {quantityValue && quantityUnit
                          ? `${unitPrice} / ${referenceValue}${referenceUnit}`
                          : '--'}
                      </Badge>
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button variant="secondary" type="button" size="sm">
                      Charge tax{' '}
                      <Badge variant="outline">{taxable ? 'Yes' : 'No'}</Badge>
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup>
                    <Button variant="secondary" type="button" size="sm">
                      Cost per item{' '}
                      {cost && <Badge variant="outline">${cost}</Badge>}
                    </Button>
                  </ButtonGroup>
                </ButtonGroup>
              )}
              <Button variant="ghost" size="icon" type="button">
                <ChevronDown />
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <FieldSet>
              <FieldGroup className="grid grid-cols-2">
                <Field>
                  <FormField
                    control={form.control}
                    name="variant.compareAtPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Compare-at price</FormLabel>
                        <FormControl>
                          <InputGroup>
                            <InputGroupInput
                              type="number"
                              placeholder="0.00"
                              {...field}
                            />
                            <InputGroupAddon>
                              <DollarSign />
                            </InputGroupAddon>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>
                <Field className="gap-1">
                  <FieldLabel>Unit</FieldLabel>
                  <ProductPriceUnit />
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <FormField
                    control={form.control}
                    name="variant.taxable"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Field orientation="horizontal">
                            <Checkbox
                              id="tax-for"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <FieldLabel
                              htmlFor="tax-for"
                              className="font-normal"
                            >
                              Charge tax on this product
                            </FieldLabel>
                          </Field>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>
              </FieldGroup>
              <FieldSeparator />
              <FieldGroup className="grid grid-cols-2">
                <Field className="flex-row">
                  <FormField
                    control={form.control}
                    name="variant.inventoryItem.cost"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InputGroup className="inline-flex w-fit">
                                <InputGroupInput
                                  type="number"
                                  placeholder="0.00"
                                  {...field}
                                />
                                <InputGroupAddon>Cost</InputGroupAddon>
                              </InputGroup>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Customers won&apos;t see this</p>
                            </TooltipContent>
                          </Tooltip>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Field>
                    <InputGroup className="inline-flex w-fit">
                      <InputGroupInput value={profit} readOnly />
                      <InputGroupAddon>Profit</InputGroupAddon>
                    </InputGroup>
                  </Field>
                  <Field>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InputGroup className="inline-flex w-fit">
                          <InputGroupInput
                            value={margin?.toFixed(2) ?? ''}
                            readOnly
                          />
                          <InputGroupAddon>Margin</InputGroupAddon>
                        </InputGroup>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Margin may vary upon destination taxes</p>
                      </TooltipContent>
                    </Tooltip>
                  </Field>
                </Field>
              </FieldGroup>
            </FieldSet>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default ProductPricingForm;
