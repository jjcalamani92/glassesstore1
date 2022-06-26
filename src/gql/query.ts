import { gql } from "@apollo/client";

export const PBS = gql`
	query HomeApplianceAll($site: String!) {
		homeApplianceAll(site: $site) {
			slug
		}
	}
`;
export const PRODUCTS = gql`
	query HomeApplianceAll($site: String!) {
		homeApplianceAll(site: $site) {
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
	query HomeApplianceAll($site: String!) {
		homeApplianceAll(site: $site) {
			category
		}
	}
`;
export const SECTION = gql`
	query HomeApplianceAll($site: String!) {
		homeApplianceAll(site: $site) {
			category
			section
		}
	}
`;
export const ITEM = gql`
	query HomeApplianceAll($site: String!) {
		homeApplianceAll(site: $site) {
			category
			section
			item
		}
	}
`;

export const CLOTHINGS = gql`
	query HomeAppliances {
		homeAppliances {
			_id
			name
			brand
			description
			image
			inStock
			slug
			section
			item
			category
			price
			tags
			site
		}
	}
`;

export const PRODUCTS_BY_ITEM = gql`
	query HomeApplianceByCategoryAndSectionAndItem($category: String!, $section: String!, $item: String!, $site: String!) {
		homeApplianceByCategoryAndSectionAndItem(category: $category, section: $section, item: $item, site: $site) {
			name
			price
			image
			slug
		}
	}
`;
export const PRODUCTS_BY_SECTION = gql`
	query HomeApplianceByCategoryAndSectionAndItem($category: String!, $section: String!, $item: String!, $site: String!) {
		homeApplianceByCategoryAndSectionAndItem(category: $category, section: $section, item: $item, site: $site) {
			name
			price
			image
			slug
		}
	}
`;

export const PRODUCT_BY_SLUG = gql`
	query HomeApplianceBySlug($slug: String!, $site: String!) {
		homeApplianceBySlug(slug: $slug, site: $site) {
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

		}
	}
`;


export const PRODUCT_ALL = gql`
	query HomeAppliancesAll($limit: Float!, $offset:Float!, $site: String!) {
		homeAppliancesAll(input:  { limit: $limit, offset: $offset}, site:$site ) {
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

			color
		}

}
`
