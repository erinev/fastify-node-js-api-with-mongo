'use strict';

const appendIdToMongoItem = item => ({
  ...item,
  id: item._id.toString()
});

function MapMongoItemToDto(mongoItem) {
  let dto = appendIdToMongoItem(mongoItem);

  delete dto._id;
  delete dto.upperCasedName;

  return dto;
}

async function GetBanners() {

}
