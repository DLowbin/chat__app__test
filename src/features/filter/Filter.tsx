import CustomButton from '~/shared/ui/components/Button';
import { allIcon, checkIcon, activeIcon } from '~/shared/assets';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHooks';
import { selectCurrentFilter, setCurrentFilter } from '../todos/model/filterSlice';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';

const cl = classNames.bind(styles);

export const Filter = () => {
	const dispatch = useAppDispatch();
	const currentFilter = useAppSelector(selectCurrentFilter);

	return (
		<div className={styles.filterblock}>
			<CustomButton
				className={cl('filterblock__button', { 'filterblock__button--active': currentFilter === 'completed' })}
				image={checkIcon}
				onClick={() => dispatch(setCurrentFilter('completed'))}
			/>
			<CustomButton
				className={cl('filterblock__button', { 'filterblock__button--active': currentFilter === 'all' })}
				image={allIcon}
				onClick={() => dispatch(setCurrentFilter('all'))}
			/>
			<CustomButton
				className={cl('filterblock__button', { 'filterblock__button--active': currentFilter === 'active' })}
				image={activeIcon}
				onClick={() => dispatch(setCurrentFilter('active'))}
			/>
		</div>
	);
};
