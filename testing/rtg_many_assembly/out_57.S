.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x4 , x0 , 4 // 0
		add     x21 , x0 , x0 // 4
		add     x12 , x0 , x0 // 8
		addi    x25 , x0 , 20 // 12
InArr:
		addi    x5 , x0 , 20 // 16 
		addi    x31 , x0 , 0 // 20
		addi    x6 , x0 , 12 // 24
		addi    x29 , x0 , 12 // 28
		sb      x5 , 20 (x25) // 32
		sb      x31 , 24 (x25) // 36
		sb      x6 , 28 (x25) // 40
		sb      x29 , 32 (x25) // 44
Loop:
		slli    x1 , x12 , 2 // 48
		add     x3 , x1 , x25 
		lb      x8 , 20 (x3) 
		add     x21 , x21 , x8 
		addi    x12 , x12 , 1 
		beq     x12 , x4 , Result 
		jal     x0 , Loop 
Result:
		addi    x30 , x0 , 44 
		bne     x30 , x21 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
