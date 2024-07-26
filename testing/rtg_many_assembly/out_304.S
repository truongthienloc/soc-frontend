.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x28 , 3
		auipc    x26 , 0
		auipc    x14 , 1
		auipc    x1 , 1
		lui      x30 , 2
		lui      x27 , 4
		lui      x18 , 1
		lui      x2 , 7
		sw       x13 , 52 (x28) 
		sw       x16 , 56 (x26) 
		sw       x15 , 60 (x14) 
		sw       x22 , 64 (x1) 
		sw       x19 , 68 (x30) 
		sw       x20 , 72 (x27) 
		sw       x10 , 76 (x18) 
		sw       x12 , 80 (x2) 
		lw       x9 , 80 (x2) 
		lw       x6 , 76 (x18) 
		lw       x23 , 72 (x27) 
		lw       x25 , 68 (x30) 
		lw       x7 , 64 (x1) 
		lw       x8 , 60 (x14) 
		lw       x5 , 56 (x26) 
		lw       x17 , 52 (x28) 
		bne      x17 , x13 , Fail
		bne      x5 , x16 , Fail
		bne      x8 , x15 , Fail
		bne      x7 , x22 , Fail
		bne      x25 , x19 , Fail
		bne      x23 , x20 , Fail
		bne      x6 , x10 , Fail
		bne      x9 , x12 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
