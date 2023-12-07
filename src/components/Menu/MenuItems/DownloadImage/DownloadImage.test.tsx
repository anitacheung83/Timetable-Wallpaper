import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../utils/test-utils';
import { initialIphoneState } from '../../../../store/settings-slice';
import { initialTimetableState } from '../../../../store/timetable-slice';
import { initialPagesState } from '../../../../store/pages-slice';
import { initialStylingState } from '../../../../store/styling-slice';
import DownloadButton from './DownloadImage';
import { initialThemeState } from '../../../../store/theme-slice';


describe('DownloadButton', () => {
    test('renders the download button', () => {
        const downloadButtonProps = {
            variants: {
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
            }
        }
        renderWithProviders(
            <DownloadButton {...downloadButtonProps} />,
            {
                preloadedState: {
                    settings: initialIphoneState,
                    courses: [],
                    timetable: initialTimetableState,
                    pages: initialPagesState,
                    styling: initialStylingState,
                    theme: initialThemeState
                }
            }

        )
        const downloadButton = screen.getByRole('button', { name: /download/i })
        expect(downloadButton).toBeInTheDocument()
    })
})