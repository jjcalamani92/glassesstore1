import { NextPage, GetServerSideProps } from 'next';
import { IHomeAppliance, IMark } from "../../../src/interfaces";
import { GraphQLClient } from 'graphql-request';
import { LayoutAdmin } from '../../../components/Layout';
import { MARK_BY_HREF } from '../../../src/gql/markQuery';
import { FormMark } from '../../../components/Layout/admin/FormMark';
interface Props {
	mark: IMark;
}
const client = new GraphQLClient(`${process.env.APIP_URL}/graphql`)
const ProductPage: NextPage<Props> = ({ mark }) => {
	return (
		<>
			<LayoutAdmin>
				<FormMark mark={mark} />
			</LayoutAdmin>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { href = '' } = query

	let mark:IMark | null | any;
  // const data = await client.request(
  //   PRODUCT_BY_SLUG, { slug: query.slug, site: process.env.API_SITE }
  // );
	// console.log(query.href)
	// let product:IHomeAppliance | null | any;
	if (href === 'new') {
		mark = {
			name: '',
			href:'',
			description: '',
			image: 'https://res.cloudinary.com/dvcyhn0lj/image/upload/v1655217461/14.1_no-image.jpg_gkwtld.jpg',
		}
	} else {
		// const data = await client.request(
		// 	PRODUCT_BY_SLUG, { slug: query.slug, site: process.env.API_SITE }
		// );
		const data = await client.request(
			MARK_BY_HREF, { href: query.href, site: process.env.API_SITE }
		);
		mark = data.marksByHref
	}
return {
	props: {
		mark
	},
};
}

export default ProductPage;