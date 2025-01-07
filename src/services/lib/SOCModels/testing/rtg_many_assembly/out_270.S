.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x7 , 3
		lui      x17 , 4
		lui      x18 , 7
		lui      x31 , 7
		lui      x21 , 5
		lui      x19 , 9
		lui      x9 , 1
		lui      x11 , 8
		sw       x16 , 44 (x7) 
		sw       x12 , 48 (x17) 
		sw       x27 , 52 (x18) 
		sw       x25 , 56 (x31) 
		sw       x4 , 60 (x21) 
		sw       x28 , 64 (x19) 
		sw       x20 , 68 (x9) 
		sw       x29 , 72 (x11) 
		lw       x23 , 72 (x11) 
		lw       x13 , 68 (x9) 
		lw       x22 , 64 (x19) 
		lw       x30 , 60 (x21) 
		lw       x24 , 56 (x31) 
		lw       x2 , 52 (x18) 
		lw       x15 , 48 (x17) 
		lw       x3 , 44 (x7) 
		bne      x3 , x16 , Fail
		bne      x15 , x12 , Fail
		bne      x2 , x27 , Fail
		bne      x24 , x25 , Fail
		bne      x30 , x4 , Fail
		bne      x22 , x28 , Fail
		bne      x13 , x20 , Fail
		bne      x23 , x29 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
