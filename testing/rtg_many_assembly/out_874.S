.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x22 , x0 , 4 
		add     x26 , x0 , x0 
		add     x29 , x0 , x0 
		addi    x18 , x0 , 60 
InArr:
		addi    x8 , x0 , 48 
		addi    x1 , x0 , 68 
		addi    x4 , x0 , 32 
		addi    x25 , x0 , 0 
		sb      x8 , 20 (x18) 
		sb      x1 , 24 (x18) 
		sb      x4 , 28 (x18) 
		sb      x25 , 32 (x18) 
Loop:
		slli    x31 , x29 , 2 
		add     x23 , x31 , x18 
		lb      x14 , 20 (x23) 
		add     x26 , x26 , x14 
		addi    x29 , x29 , 1 
		beq     x29 , x22 , Result 
		jal     x0 , Loop 
Result:
		addi    x16 , x0 , 148 
		bne     x16 , x26 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
