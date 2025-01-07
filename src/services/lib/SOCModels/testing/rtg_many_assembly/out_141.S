.text

#The program checks the ALU instruction in R_type

Main:
		addi    x12 , x0 , 117 
		addi    x4 , x0 , 18 
		addi    x27 , x0 , 195 
		addi    x16 , x0 , 22 
		addi    x6 , x0 , 3 
		blt     x12 , x4 , Less_r 
		bge     x12 , x4 , Bigger_r 
Less_r:
		sub     x28 , x27 , x16 
		and     x18 , x27 , x16 
		slti    x18 , x18 , 121 
		srl     x18 , x18 , x6 
		addi    x14 , x0 , 21 
		bne     x18 , x14 , Fail 
Bigger_r:
		or      x28 , x27 , x16 
		xor     x18 , x27 , x16 
		sltiu   x18 , x18 , 15 
		sra     x18 , x18 , x6 
		addi    x14 , x0 , 53 
		bne     x18 , x14 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
