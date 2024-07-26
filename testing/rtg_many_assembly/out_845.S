.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x26 , x0 , 4 
		add     x4 , x0 , x0 
		add     x14 , x0 , x0 
		addi    x15 , x0 , 68 
		addi    x31 , x0 , 2 
InArr:
		addi    x25 , x0 , 72 
		addi    x2 , x0 , 12 
		addi    x8 , x0 , 44 
		addi    x22 , x0 , 40 
		sh      x25 , 52 (x15) 
		sh      x2 , 56 (x15) 
		sh      x8 , 60 (x15) 
		sh      x22 , 64 (x15) 
Loop:
		sll     x30 , x14 , x31 
		add     x24 , x30 , x15 
		lhu     x6 , 52 (x24) 
		add     x4 , x4 , x6 
		addi    x14 , x14 , 1 
		beq     x14 , x26 , Result 
		jal     x0 , Loop 
Result:
		addi    x12 , x0 , 168 
		bne     x12 , x4 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
