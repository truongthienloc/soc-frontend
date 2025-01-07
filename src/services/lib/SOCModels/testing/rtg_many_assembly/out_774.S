.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui     x9 , 4 
		lui     x19 , 5 
		lui     x29 , 9 
		lui     x25 , 2 
		sw      x21 , 56 (x9) 
		sw      x3 , 60 (x19) 
		sw      x16 , 64 (x29) 
		sw      x27 , 68 (x25) 
		lw      x28 , 68 (x25) 
		lw      x5 , 64 (x29) 
		lw      x4 , 60 (x19) 
		lw      x17 , 56 (x9) 
		bne     x17 , x21 , Fail
		bne     x4 , x3 , Fail
		bne     x5 , x16 , Fail
		bne     x28 , x27 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
