import { NextPage, GetServerSideProps } from 'next';
import { PRODUCT_BY_SLUG } from '../../../src/gql/query';
import { IHomeAppliance } from "../../../src/interfaces";
import { GraphQLClient } from 'graphql-request';
import { Form } from '../../../components/Components';
import { LayoutAdmin } from '../../../components/Layout';
interface Props {
	product: IHomeAppliance;
}
const client = new GraphQLClient(`${process.env.APIP_URL}/graphql`)
const ProductPage: NextPage<Props> = ({ product }) => {
	return (
		<>
			<LayoutAdmin>
				<Form product={product} />
			</LayoutAdmin>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { slug = '' } = query
	let product:IHomeAppliance | null | any;
	if (slug === 'new') {
		
    product = {
			name: '',
			brand: '',
			image: [],
			description: '',
			inStock: 0,
			category:'',
			section: '',
			item: '',
			price: 0,
			oldPrice: 0,
			tags: [],

			color: 'como se ve en la imagen',
			// sizes:[]

		}
	} else {
		const data = await client.request(
			PRODUCT_BY_SLUG, { slug: query.slug, site: process.env.API_SITE }
		);
		product = data.homeApplianceBySlug
	}
return {
	props: {
		product
	},
};
}

export default ProductPage;