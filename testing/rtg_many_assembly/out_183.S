.text

#The program checks the ALU instruction in R_type

Main:
		addi    x9 , x0 , 180 
		addi    x29 , x0 , 81 
		addi    x7 , x0 , 153 
		addi    x23 , x0 , 198 
		addi    x8 , x0 , 0 
		blt     x9 , x29 , Less_r 
		bge     x9 , x29 , Bigger_r 
Less_r:
		sub     x19 , x7 , x23 
		and     x3 , x7 , x23 
		slti    x3 , x3 , 199 
		srl     x3 , x3 , x8 
		addi    x12 , x0 , 83 
		bne     x3 , x12 , Fail 
Bigger_r:
		or      x19 , x7 , x23 
		xor     x3 , x7 , x23 
		sltiu   x3 , x3 , 2 
		sra     x3 , x3 , x8 
		addi    x12 , x0 , 318 
		bne     x3 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
