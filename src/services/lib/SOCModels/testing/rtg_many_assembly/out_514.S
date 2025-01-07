.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		lui      x21 , 8
		lui      x14 , 6
		lui      x7 , 3
		lui      x23 , 0
		lui      x20 , 1
		lui      x9 , 8
		lui      x15 , 5
		lui      x28 , 4
		sw       x10 , 28 (x21) 
		sw       x6 , 32 (x14) 
		sw       x25 , 36 (x7) 
		sw       x5 , 40 (x23) 
		sw       x18 , 44 (x20) 
		sw       x2 , 48 (x9) 
		sw       x12 , 52 (x15) 
		sw       x31 , 56 (x28) 
		lw       x11 , 56 (x28) 
		lw       x16 , 52 (x15) 
		lw       x8 , 48 (x9) 
		lw       x24 , 44 (x20) 
		lw       x27 , 40 (x23) 
		lw       x26 , 36 (x7) 
		lw       x22 , 32 (x14) 
		lw       x3 , 28 (x21) 
		bne      x3 , x10 , Fail
		bne      x22 , x6 , Fail
		bne      x26 , x25 , Fail
		bne      x27 , x5 , Fail
		bne      x24 , x18 , Fail
		bne      x8 , x2 , Fail
		bne      x16 , x12 , Fail
		bne      x11 , x31 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
