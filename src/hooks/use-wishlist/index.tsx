import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/client';
import { useMutation } from '@apollo/client';

import { MUTATION_CREATE_WISHLIST, MUTATION_UPDATE_WISHLIST } from "graphql/mutations/wishlist";

import { GameCardProps } from 'components/GameCard';
import { useQueryWishlist } from 'graphql/queries/wishlist';
import { gamesMapper } from 'utils/mappers';
import { QueryWishlist_wishlists_games } from 'graphql/generated/QueryWishlist';

export type WishlistContextData = {
	items: GameCardProps[];
	isInWishlist: (id: string) => boolean;
	addToWishlist: (id: string) => void;
	removeFromWishlist: (id: string) => void;
	loading: boolean;
}

export const WishlistContextDefaultValues = {
	items: [],
	isInWishlist: () => false,
	addToWishlist: () => null,
	removeFromWishlist: () => null,
	loading: false,
};

export type WishlistProviderProps = {
	children: React.ReactNode;
}

export const WishlistContext = createContext<WishlistContextData>(WishlistContextDefaultValues);

const WishlistProvider = ({ children }: WishlistProviderProps) => {
	const [session] = useSession();
	const [wishlistId, setWishlistId] = useState<string | null>();
	const [wishlistItems, setWishlistItems] = useState<QueryWishlist_wishlists_games[]>([]);

	const [createList, { loading: loadingCreate }] = useMutation(MUTATION_CREATE_WISHLIST, {
		context: { session },
		onCompleted: (data) => {
			setWishlistItems(data?.createWishlist?.wishlist?.games || []);
			setWishlistId(data?.createWishlist?.wishlist?.id);
		},
	});

	const [updateList, { loading: loadingUpdate }] = useMutation(MUTATION_UPDATE_WISHLIST, {
		context: { session },
		onCompleted: (data) => {
			setWishlistItems(data?.createWishlist?.wishlist?.games || []);
			setWishlistId(data?.createWishlist?.wishlist?.id);
		},
	});

	const { data, loading: loadingQuery } = useQueryWishlist({
		skip: !session?.user?.email,
		context: { session },
		variables: {
			identifier: session?.user?.email as string,
		}
	});

	useEffect(() => {
		setWishlistItems(data?.wishlists[0]?.games || []);
		setWishlistId(data?.wishlists[0]?.id || null);
	}, [data]);

	const wishlistIds = useMemo(() => wishlistItems.map(game => game.id), [wishlistItems]);

	function isInWishlist(id: string){
		return !!wishlistItems.find((game) => game.id === id);
	}

	function addToWishlist(id: string){
		if (!wishlistId) {
			return createList({
				variables: {
					input: {
						data: {
							games: [...wishlistIds, id]
						}
					}
				},
			});
		}

		return updateList({
			variables: {
				input: {
					where: { id: wishlistId },
					data: { games: [...wishlistIds, id] }
				}
			},
		});
	}

	function removeFromWishlist(id: string){
		return updateList({
			variables: {
				input: {
					where: { id: wishlistId },
					data: { games: wishlistIds.filter((gameId: string) => gameId !== id) }
				}
			},
		});
	}

	return (
		<WishlistContext.Provider value={{ items: gamesMapper(wishlistItems), isInWishlist, addToWishlist, removeFromWishlist, loading: loadingQuery || loadingCreate || loadingUpdate }}>
			{ children }
		</WishlistContext.Provider>
	);
};

const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };