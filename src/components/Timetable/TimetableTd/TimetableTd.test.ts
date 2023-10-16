import { render, screen } from '@testing-library/react';
import TimetableTd from './TimetableTd';
import { renderWithProviders } from '../../../utils/test-utils';
import dayjs from 'dayjs';

describe('TimetableTd', () => {
    test('renders TimetableTd component', () => {
        const courseGridInfo = {

        }

        const timetableTdProps = {
            rowspan: 1,
            courseGridInfos: [],
            time: dayjs('2021-01-01 09:00:00'),
        }

    })
})