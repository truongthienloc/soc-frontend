.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x6 , 7
		auipc    x8 , 4
		auipc    x28 , 1
		auipc    x23 , 2
		lui      x9 , 0
		lui      x19 , 0
		lui      x21 , 2
		lui      x29 , 2
		sw       x12 , 60 (x6) 
		sw       x13 , 64 (x8) 
		sw       x25 , 68 (x28) 
		sw       x20 , 72 (x23) 
		sw       x15 , 76 (x9) 
		sw       x1 , 80 (x19) 
		sw       x31 , 84 (x21) 
		sw       x22 , 88 (x29) 
		lw       x30 , 88 (x29) 
		lw       x7 , 84 (x21) 
		lw       x27 , 80 (x19) 
		lw       x17 , 76 (x9) 
		lw       x16 , 72 (x23) 
		lw       x3 , 68 (x28) 
		lw       x18 , 64 (x8) 
		lw       x4 , 60 (x6) 
		bne      x4 , x12 , Fail
		bne      x18 , x13 , Fail
		bne      x3 , x25 , Fail
		bne      x16 , x20 , Fail
		bne      x17 , x15 , Fail
		bne      x27 , x1 , Fail
		bne      x7 , x31 , Fail
		bne      x30 , x22 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
