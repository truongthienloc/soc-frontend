.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x12 , x0 , 4 
		add     x20 , x0 , x0 
		add     x3 , x0 , x0 
		addi    x18 , x0 , 52 
InArr:
		addi    x2 , x0 , 36 
		addi    x16 , x0 , 0 
		addi    x14 , x0 , 56 
		addi    x30 , x0 , 12 
		sb      x2 , 0 (x18) 
		sb      x16 , 4 (x18) 
		sb      x14 , 8 (x18) 
		sb      x30 , 12 (x18) 
Loop:
		slli    x31 , x3 , 2 
		add     x15 , x31 , x18 
		lb      x28 , 0 (x15) 
		add     x20 , x20 , x28 
		addi    x3 , x3 , 1 
		beq     x3 , x12 , Result 
		jal     x0 , Loop 
Result:
		addi    x5 , x0 , 104 
		bne     x5 , x20 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
