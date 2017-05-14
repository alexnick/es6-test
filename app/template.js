export default class Template {
  itemList(items) {
    return items.reduce((a, item) => a + `
        <div class="parent-item-wrapper" data-id="${item.id}">
            <p>${item.properties.name}</p>
                <p>
                  Price:
                  <span>${item.properties.reducedPrice.amount} ${item.properties.reducedPrice.currencyCode}</span>
                  (<s>${item.properties.originalPrice.amount} ${item.properties.originalPrice.currencyCode}</s>)
                </p>
            <button>Show Details</button>
            <div class="parent-container"></div>
        </div>`, '');
  }

  emptyChild() {
    return '<div>There is nothing to show here :(</div>'
  }

  childrenList(items, id) {
    return items.reduce((a, item, idx) => a + `
        <div class="child-item-wrapper" data-id="${id}">
        <table style="width:100%">
          <tr>
            <th>Title</th>
            <th>Value</th> 
          </tr>
          <tr>
            <td>Name:</td>
            <td>
                <input class="child-name" size="80" type="text" value="${item.properties.name}">
            </td> 
          </tr>
          <tr>
            <td>Category:</td>
            <td>
                <input class="child-category" size="80" type="text" value="${item.properties.category}">
            </td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>
              <textarea class="child-description" cols="78">
                  ${item.properties.description}
              </textarea>
            </td>
          </tr>
          <tr>
            <td>Product Name:</td>
            <td>
                <input class="child-product-name" size="80" type="text" value="${item.properties.productName}">
            </td>
          </tr>
          <tr>
            <td>Retailer Url:</td>
            <td>
                <input class="child-url" size="80" type="text" value="${item.properties.retailerUrl}">
            </td>
          </tr>
          <tr>
            <td>Product Brand:</td>
             <td>
                <input class="child-brand" size="80" type="text" value="${item.properties.productBrand}">
             </td>
          </tr>
          <tr>
            <td>Reduced Price:</td>
            <td>
                <input class="child-reduced-price" size="80" type="text" value="${item.properties.reducedPrice.amount}">
            </td> 
          </tr>
          <tr>
            <td>Original Price:</td>
            <td>
                <input class="child-original-price" size="80" type="text" value="${item.properties.originalPrice.amount}">
            </td> 
          </tr>
        </table>
          <div class="child-item-controls">
            <button data-id="${idx}" class="save-button">Save changes</button>
            <button data-id="${idx}" class="delete-button">Delete</button>
          </div>
        </div>`, '');
  }
}
