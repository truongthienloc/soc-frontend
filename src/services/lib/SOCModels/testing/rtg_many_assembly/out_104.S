.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x19 , x0 , 4 
		addi    x14 , x0 , 0 
		addi    x12 , x0 , 0 
		addi    x25 , x0 , 60 
InArr:
		addi    x31 , x0 , 16 
		addi    x18 , x0 , 12 
		addi    x29 , x0 , 44 
		addi    x28 , x0 , 4 
		sh      x31 , 44 (x25) 
		sh      x18 , 48 (x25) 
		sh      x29 , 52 (x25) 
		sh      x28 , 56 (x25) 
Loop:
		slli    x10 , x12 , 2 
		add     x7 , x10 , x25 
		lh      x8 , 44 (x7) 
		add     x14 , x14 , x8 
		addi    x12 , x12 , 1 
		beq     x12 , x19 , Result 
		jal     x0 , Loop 
Result:
		addi    x22 , x0 , 76 
		bne     x22 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
