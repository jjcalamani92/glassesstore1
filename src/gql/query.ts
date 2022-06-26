import { gql } from "@apollo/client";

export const PBS = gql`
	query GlassesAll($site: String!) {
		glassesAll(site: $site) {
			slug
		}
	}
`;
export const PRODUCTS = gql`
	query GlassesAll($site: String!) {
		glassesAll(site: $site) {
			name
			image
			price
			description
			category
			section
			item
			slug
		}
	}
`;

export const CATEGORY = gql`
	query GlassesAll($site: String!) {
		glassesAll(site: $site) {
			category
		}
	}
`;
export const SECTION = gql`
	query GlassesAll($site: String!) {
		glassesAll(site: $site) {
			category
			section
		}
	}
`;
export const ITEM = gql`
	query GlassesAll($site: String!) {
		glassesAll(site: $site) {
			category
			section
			item
		}
	}
`;

// export const CLOTHINGS = gql`
// 	query Glassess {
// 		glassess {
// 			_id
// 			name
// 			brand
// 			description
// 			image
// 			inStock
// 			slug
// 			section
// 			item
// 			category
// 			price
// 			tags
// 			site
// 		}
// 	}
// `;

export const PRODUCTS_BY_ITEM = gql`
	query GlassesByCategoryAndSectionAndItem($category: String!, $section: String!, $item: String!, $site: String!) {
		glassesByCategoryAndSectionAndItem(category: $category, section: $section, item: $item, site: $site) {
			name
			price
			image
			slug
		}
	}
`;
export const PRODUCTS_BY_SECTION = gql`
	query GlassesByCategoryAndSectionAndItem($category: String!, $section: String!, $item: String!, $site: String!) {
		glassesByCategoryAndSectionAndItem(category: $category, section: $section, item: $item, site: $site) {
			name
			price
			image
			slug
		}
	}
`;

export const PRODUCT_BY_SLUG = gql`
	query GlassesBySlug($slug: String!, $site: String!) {
		glassesBySlug(slug: $slug, site: $site) {
			_id
			name
			brand
			description
			image
			inStock
			slug
			category
			section
			item
			price
			oldPrice
			tags

			glasses
			form
			bridge
			rod

		}
	}
`;


export const PRODUCT_ALL = gql`
	query GlassessAll($limit: Float!, $offset:Float!, $site: String!) {
		glassessAll(input:  { limit: $limit, offset: $offset}, site:$site ) {
			_id
			name
			brand
			description
			image
			inStock
			slug
			category
			section
			item
			price
			tags

			glasses
			form
			bridge
			rod
		}

}
`
