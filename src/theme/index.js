import { Colors, Typography } from 'react-native-ui-lib'
import * as colors from './colors'
Colors.loadColors({
  ...colors
})
let textSize = {}

for (let i = 1; i <= 300; i++) {
  textSize[`text-${i}`] = { fontSize: i }
}
Typography.loadTypographies(textSize)
export { colors }
