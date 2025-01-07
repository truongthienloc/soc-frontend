.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x6 , x0 , 4 
		add     x29 , x0 , x0 
		add     x27 , x0 , x0 
		addi    x13 , x0 , 0 
InArr:
		addi    x26 , x0 , 40 
		addi    x23 , x0 , 28 
		addi    x10 , x0 , 52 
		addi    x14 , x0 , 72 
		sb      x26 , 8 (x13) 
		sb      x23 , 12 (x13) 
		sb      x10 , 16 (x13) 
		sb      x14 , 20 (x13) 
Loop:
		slli    x25 , x27 , 2 
		add     x5 , x25 , x13 
		lb      x20 , 8 (x5) 
		add     x29 , x29 , x20 
		addi    x27 , x27 , 1 
		beq     x27 , x6 , Result 
		jal     x0 , Loop 
Result:
		addi    x3 , x0 , 192 
		bne     x3 , x29 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
