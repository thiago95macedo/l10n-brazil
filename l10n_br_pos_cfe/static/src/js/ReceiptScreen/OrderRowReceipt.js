odoo.define("l10n_br_pos_cfe.OrderRowReceipt", function (require) {
    "use strict";

    const PosComponent = require("point_of_sale.PosComponent");
    const Registries = require("point_of_sale.Registries");
    const utils = require("web.utils");

    const round_pr = utils.round_precision;

    class OrderRowReceipt extends PosComponent {
        get line() {
            return this.props.line;
        }

        // Getters //
        get id() {
            const lineCollections = this.env.pos.get_order().get_orderlines();
            const index = _.findIndex(lineCollections, {id: this.line.id}) + 1;
            if (index < 10) {
                return String(index).padStart(3, "0");
            } else if (index < 100) {
                return String(index).padStart(2, "0");
            }
            return String(index);
        }

        get defaultCode() {
            return this.line.product_default_code;
        }

        get productName() {
            return this.line.product_name;
        }

        get productQuantity() {
            return this.line.quantity;
        }

        get productUnitCode() {
            return this.line.unit_code;
        }

        get productPrice() {
            return this.line.price.toFixed(2);
        }

        get taxes() {
            return this.line.tax;
        }

        get total() {
            return round_pr(this.productQuantity * this.productPrice).toFixed(2);
        }
    }
    OrderRowReceipt.template = "OrderRowReceipt";

    Registries.Component.add(OrderRowReceipt);

    return OrderRowReceipt;
});
