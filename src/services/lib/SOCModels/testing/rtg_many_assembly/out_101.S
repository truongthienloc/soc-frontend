.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x13 , 6 
		lui     x17 , 7 
		lui     x21 , 7 
		lui     x28 , 2 
		sw      x25 , 68 (x13) 
		sw      x31 , 72 (x17) 
		sw      x16 , 76 (x21) 
		sw      x5 , 80 (x28) 
		lw      x7 , 80 (x28) 
		lw      x20 , 76 (x21) 
		lw      x12 , 72 (x17) 
		lw      x30 , 68 (x13) 
		bne     x30 , x25 , Fail
		bne     x12 , x31 , Fail
		bne     x20 , x16 , Fail
		bne     x7 , x5 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
