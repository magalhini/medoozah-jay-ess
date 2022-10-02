import { useCallback, useMemo } from "react";
import styled from "styled-components";
import Head from "next/head";
import { Product } from "@medusajs/medusa";
import { useState } from "react";
import { GetServerSideProps } from "next";
import {
  Button,
  Dropdown,
  NumericInput,
  Spacing,
} from "../../components/shared";
import Layout from "../../components/layout";
import {
  ProductImage,
  ProductImageWrapper,
  Details,
  Title,
  Description,
  Price,
  OptionLabel,
} from "../../components/Product/Details.styled";
import medusa from "../../lib/config";
import { formatCurrency } from "../../lib/utils";

type ProductPageProps = {
  product: Product;
};

const ProductPageGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 3em;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default function ProductPage({ product }: ProductPageProps) {
  const { variants, options } = product;
  const [selectedVariant, setSelectedVariant] = useState(variants[0].id);
  const [amount, setAmount] = useState(0);

  const variantOptions = useMemo(() => {
    return variants.map(({ title, id }) => ({
      label: title,
      value: id,
    }));
  }, [variants]);

  console.log(product, "- product");
  console.log(variantOptions);

  const productDetails = useMemo(() => {
    return variants.find(({ id }) => id === selectedVariant);
  }, [selectedVariant]);

  console.log(productDetails);

  return (
    <Layout home={false}>
      <Head>
        <title>{product.title}</title>
      </Head>
      <ProductPageGrid>
        <ProductImageWrapper>
          <ProductImage alt={product.title} src={product.images[0].url} />
        </ProductImageWrapper>
        <Details>
          <Title>{product.title}</Title>
          <Price>{formatCurrency(productDetails.prices[0].amount)}</Price>
          <Description>{product.description}</Description>
          <OptionLabel>Options:</OptionLabel>

          <Spacing bottom="m">
            <Dropdown
              onHandleChange={(event) => setSelectedVariant(event.target.value)}
              value={selectedVariant || variantOptions[0].value}
              options={variantOptions}
            />
          </Spacing>

          <OptionLabel>Amount:</OptionLabel>
          <Spacing bottom="m">
            <NumericInput onChange={setAmount} value={amount} />
          </Spacing>
          <Button
            disabled={amount == 0}
            fullWidth
            onClick={(event) => {
              console.log(event);
            }}
            primary
          >
            Add to cart
          </Button>
        </Details>
      </ProductPageGrid>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const productDetails = await medusa.products
    .retrieve(query.id)
    .then(({ product }) => ({ product }));

  return {
    props: {
      product: productDetails.product as ProductPageProps,
    },
  };
};
