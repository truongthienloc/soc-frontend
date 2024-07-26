.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x27 , 8 
		lui     x28 , 0 
		lui     x31 , 2 
		lui     x25 , 2 
		sw      x21 , 68 (x27) 
		sw      x30 , 72 (x28) 
		sw      x6 , 76 (x31) 
		sw      x3 , 80 (x25) 
		lw      x12 , 80 (x25) 
		lw      x14 , 76 (x31) 
		lw      x10 , 72 (x28) 
		lw      x7 , 68 (x27) 
		bne     x7 , x21 , Fail
		bne     x10 , x30 , Fail
		bne     x14 , x6 , Fail
		bne     x12 , x3 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
