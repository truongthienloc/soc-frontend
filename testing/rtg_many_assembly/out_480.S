.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x16 , x0 , 4 
		add     x5 , x0 , x0 
		add     x23 , x0 , x0 
		addi    x15 , x0 , 48 
InArr:
		addi    x8 , x0 , 16 
		addi    x9 , x0 , 36 
		addi    x13 , x0 , 8 
		addi    x31 , x0 , 56 
		sb      x8 , 76 (x15) 
		sb      x9 , 80 (x15) 
		sb      x13 , 84 (x15) 
		sb      x31 , 88 (x15) 
Loop:
		slli    x20 , x23 , 2 
		add     x29 , x20 , x15 
		lb      x25 , 76 (x29) 
		add     x5 , x5 , x25 
		addi    x23 , x23 , 1 
		beq     x23 , x16 , Result 
		jal     x0 , Loop 
Result:
		addi    x11 , x0 , 116 
		bne     x11 , x5 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
