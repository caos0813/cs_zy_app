import { Colors } from 'react-native-ui-lib'
import * as colors from './colors'
Colors.loadColors({
  ...colors
})
/* let textSize = {}

for (let i = 1; i <= 300; i++) {
  textSize[`text-${i}`] = { fontSize: i }
}
Typography.loadTypographies(textSize) */
/* Typography.loadTypographies({
  uLight: { fontWeight: '100' },
  thin: { fontWeight: '200' },
  light: { fontWeight: '300' },
  regular: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  thick: { fontWeight: '600' },
  bold: { fontWeight: '700' }
}) */
export { colors }
