import { StarXpandCommand } from 'react-native-star-io10';
import { MagnificationParameter } from 'react-native-star-io10/src/StarXpandCommand/MagnificationParameter';
import { CharacterEncodingType } from 'react-native-star-io10/src/StarXpandCommand/Printer/CharacterEncodingType';
import { CjkCharacterType } from 'react-native-star-io10/src/StarXpandCommand/Printer/CjkCharacterType';
import { CutType } from 'react-native-star-io10/src/StarXpandCommand/Printer/CutType';
import { PageModeAreaParameter } from 'react-native-star-io10/src/StarXpandCommand/Printer/PageModeAreaParameter';
import { QRCodeLevel } from 'react-native-star-io10/src/StarXpandCommand/Printer/QRCodeLevel';
import { QRCodeModel } from 'react-native-star-io10/src/StarXpandCommand/Printer/QRCodeModel';
import { QRCodeParameter } from 'react-native-star-io10/src/StarXpandCommand/Printer/QRCodeParameter';

export class LabelSample18_ShelfLabelForInventory_Template {
    static async createShelfLabelForInventory(): Promise<string> {
        var builder = new StarXpandCommand.StarXpandCommandBuilder();

        builder.addDocument(
            new StarXpandCommand.DocumentBuilder()
                .settingPrintableArea(48.0)
                .addPrinter(
                    new StarXpandCommand.PrinterBuilder()
                    // モデルにより対応する文字エンコーディング指定APIが異なります。
                    // 下記ページのSupported Modelを参照し、ご利用のモデルが対応するAPIを使用してください。
                    // https://www.star-m.jp/products/s_print/sdk/react-native-star-io10/manual/ja/api-reference/star-xpand-command/printer-builder/style-cjk-character-priority.html
                    .styleCjkCharacterPriority([CjkCharacterType.Japanese])
                    // https://www.star-m.jp/products/s_print/sdk/react-native-star-io10/manual/ja/api-reference/star-xpand-command/printer-builder/style-second-priority-character-encoding.html
                    //.styleSecondPriorityCharacterEncoding(CharacterEncodingType.Japanese)

                    .addPageMode(
                        new PageModeAreaParameter(48.0, 36.0),
                        new StarXpandCommand.PageModeBuilder()
                            .styleVerticalPositionTo(6.0)
                            .add(
                                new StarXpandCommand.PageModeBuilder()
                                    .styleMagnification(new MagnificationParameter(2, 2))
                                    .actionPrintText(
                                        "${name}"
                                    )
                            )

                            .styleHorizontalPositionTo(0.0)
                            .styleVerticalPositionTo(15.0)
                            .actionPrintQRCode(
                                new QRCodeParameter("${sku}")
                                    .setCellSize(4)
                                    .setLevel(QRCodeLevel.L)
                                    .setModel(QRCodeModel.Model2)
                            )
                            .addPageMode(
                                new PageModeAreaParameter(35.0, 24.0)
                                    .setX(13.0)
                                    .setY(12.0),
                                new StarXpandCommand.PageModeBuilder()
                                    .actionPrintText(
                                        "${company}\n" +
                                        "${note}\n" +
                                        "使用材料名:${material}\n" +
                                        "金型取数:${mold_cavities}\n" +
                                        "整形場所:${molding_place}\n"
                                    )
                            )
                    )
                    .actionCut(CutType.Partial)
                ));

        return await builder.getCommands();
    }
}