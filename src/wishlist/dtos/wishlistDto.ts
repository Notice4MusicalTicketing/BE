export interface AddFavoriteDto {
    memberId: BigInt;
    musicalId: BigInt;
  }
  
  export interface RemoveFavoriteDto {
    memberId: BigInt;
    musicalId: BigInt;
  }
  
  export interface FavoriteDto {
    wishlistId: BigInt;
    memberId: BigInt;
    musicalId: BigInt;
  }
  