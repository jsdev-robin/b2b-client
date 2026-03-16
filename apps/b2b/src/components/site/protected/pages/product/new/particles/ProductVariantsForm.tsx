'use client';

import { Badge } from '@repo/ui/components/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui/components/collapsible';
import { FieldGroup, FieldSet } from '@repo/ui/components/field';
import { Separator } from '@repo/ui/components/separator';
import { Database } from 'lucide-react';
import React from 'react';
import { useProductAttributes } from '../contexts/ProductAttributesContext';
import ProductAttributes from './ProductAttributes';
import ProductAttributeValues from './ProductAttributeValues';
import ProductVariantsGroupForm from './ProductVariantsGroupForm';

const ProductVariantsForm = () => {
  const { values } = useProductAttributes();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variants</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border border-border rounded-md">
            {values?.length > 0 &&
              values.map((item, i) => (
                <React.Fragment key={i}>
                  <Collapsible className="grid gap-2 grid-cols-1 p-4">
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between">
                        <span>Option name</span>
                        <Badge>
                          <Database /> Size
                        </Badge>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <FieldSet>
                        <FieldGroup>
                          <ProductAttributeValues attribute={item} />
                        </FieldGroup>
                      </FieldSet>
                    </CollapsibleContent>
                  </Collapsible>
                  {i !== values.length - 1 && <Separator />}
                </React.Fragment>
              ))}
          </div>
          {values.length < 3 && <ProductAttributes />}
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <ProductVariantsGroupForm />
      </CardFooter>
    </Card>
  );
};

export default ProductVariantsForm;
