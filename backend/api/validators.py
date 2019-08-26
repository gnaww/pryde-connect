from django.core.exceptions import ValidationError
import magic

def validate_file_size(value):
    print('validating file size')
    filesize = value.size

    if filesize > 10485760:
        raise ValidationError("The maximum file size that can be uploaded is 10MB")
    else:
        return value

def validate_is_image(file):
    filetype = magic.from_buffer(file.read())
    if 'image' not in filetype:
        raise ValidationError('File is not a valid image')
    return file

def validate_file_type(file):
    print('validating file type')
    valid_mimes = ['pdf', 'image', 'text', 'document']
    filetype = magic.from_buffer(file.read(), mime=True)
    print(filetype)
    valid = False
    for mime in valid_mimes:
        if mime in filetype:
            valid = True
            break

    if valid:
        return file
    raise ValidationError('Files of this type are not allowed')
