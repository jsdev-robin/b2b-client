'use client';

import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { ButtonGroup } from '@repo/ui/components/button-group';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Checkbox } from '@repo/ui/components/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui/components/collapsible';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@repo/ui/components/field';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemHeader,
  ItemTitle,
} from '@repo/ui/components/item';
import { Label } from '@repo/ui/components/label';
import { Switch } from '@repo/ui/components/switch';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import { useWatch } from 'react-hook-form';
import { useProductForm } from '../contexts/ProductFormContext';

countries.registerLocale(enLocale);

const ProductInventoryForm = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { form } = useProductForm();

  const [sku, barcode, inventoryPolicy] = useWatch({
    control: form.control,
    name: [
      'variant.inventoryItem.sku',
      'variant.barcode',
      'variant.inventoryPolicy',
    ],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory</CardTitle>
        <CardAction>
          <Field>
            <FormField
              control={form.control}
              name="variant.inventoryItem.tracked"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Field orientation="horizontal">
                      <FieldLabel htmlFor="tracked">
                        Inventory tracked
                      </FieldLabel>
                      <Switch
                        id="tracked"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </Field>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Field>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Item variant="outline" size="sm" className="p-0 gap-0">
          <ItemHeader className="bg-muted p-2 rounded-t-md">
            Quantity
            <ItemActions>Quantity</ItemActions>
          </ItemHeader>
          <ItemContent className="flex flex-row items-center justify-between p-2">
            <ItemTitle>Shop location</ItemTitle>
            <Field className="max-w-32">
              <FormField
                control={form.control}
                name="variant.inventoryQuantities.0.availableQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Field>
          </ItemContent>
        </Item>
      </CardContent>
      <CardFooter className="w-full">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="grid grid-cols-1 gap-4 w-full"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between gap-4">
              {isOpen ? (
                <Label>More details</Label>
              ) : (
                <div className="flex items-center gap-2">
                  <ButtonGroup>
                    <ButtonGroup>
                      <Button variant="secondary" type="button" size="sm">
                        SKU {sku && <Badge variant="outline">{sku}</Badge>}
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button variant="secondary" type="button" size="sm">
                        Barcode{' '}
                        {barcode && <Badge variant="outline">{barcode}</Badge>}
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button variant="secondary" type="button" size="sm">
                        Sell when out of stock{' '}
                        {inventoryPolicy && (
                          <Badge variant="outline">
                            {inventoryPolicy === 'CONTINUE' ? 'Yes' : 'No'}
                          </Badge>
                        )}
                      </Button>
                    </ButtonGroup>
                  </ButtonGroup>
                </div>
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
                    name="variant.inventoryItem.sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>
                <Field>
                  <FormField
                    control={form.control}
                    name="variant.barcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Barcode (ISBN, UPC, GTIN, etc.)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>
                <Field>
                  <FormField
                    control={form.control}
                    name="variant.inventoryPolicy"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Field orientation="horizontal">
                            <Checkbox
                              id="inventoryPolicy"
                              checked={field.value === 'CONTINUE'}
                              onCheckedChange={(checked) =>
                                field.onChange(checked ? 'CONTINUE' : 'DENY')
                              }
                            />
                            <FieldLabel htmlFor="inventoryPolicy">
                              Continue selling when out of stock
                            </FieldLabel>
                          </Field>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </CollapsibleContent>
        </Collapsible>
      </CardFooter>
    </Card>
  );
};

export default ProductInventoryForm;
