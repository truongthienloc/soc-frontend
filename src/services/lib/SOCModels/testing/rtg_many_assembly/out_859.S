.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x24 , 0
		auipc    x7 , 9
		auipc    x19 , 7
		auipc    x5 , 4
		lui      x16 , 9
		lui      x31 , 3
		lui      x15 , 5
		lui      x18 , 7
		sw       x9 , 116 (x24) 
		sw       x1 , 120 (x7) 
		sw       x3 , 124 (x19) 
		sw       x21 , 128 (x5) 
		sw       x23 , 132 (x16) 
		sw       x28 , 136 (x31) 
		sw       x25 , 140 (x15) 
		sw       x20 , 144 (x18) 
		lw       x17 , 144 (x18) 
		lw       x22 , 140 (x15) 
		lw       x27 , 136 (x31) 
		lw       x8 , 132 (x16) 
		lw       x13 , 128 (x5) 
		lw       x6 , 124 (x19) 
		lw       x2 , 120 (x7) 
		lw       x26 , 116 (x24) 
		bne      x26 , x9 , Fail
		bne      x2 , x1 , Fail
		bne      x6 , x3 , Fail
		bne      x13 , x21 , Fail
		bne      x8 , x23 , Fail
		bne      x27 , x28 , Fail
		bne      x22 , x25 , Fail
		bne      x17 , x20 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
