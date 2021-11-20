import InputGroup from 'rsuite/InputGroup';
import Input from 'rsuite/Input';
import SearchIcon from '@rsuite/icons/Search';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';

const SearchInput = ({ value, onChange, onSearch, isLoading }) => (
    <InputGroup inside>
        <Input
            placeholder={'Public username...'}
            value={value}
            onChange={(e) => onChange(e || '')}
        />
        <InputGroup.Button onClick={onSearch}>
            {isLoading ? <SpinnerIcon spin /> : <SearchIcon />}
        </InputGroup.Button>
    </InputGroup>
);

export default SearchInput;
