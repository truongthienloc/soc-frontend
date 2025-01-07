.text

#The program checks the ALU instruction in R_type

Main:
		addi    x31 , x0 , 174 
		addi    x8 , x0 , 75 
		addi    x23 , x0 , 48 
		addi    x7 , x0 , 161 
		addi    x2 , x0 , 4 
		blt     x31 , x8 , Less_r 
		bge     x31 , x8 , Bigger_r 
Less_r:
		sub     x18 , x23 , x7 
		and     x28 , x23 , x7 
		slti    x28 , x28 , 164 
		srl     x28 , x28 , x2 
		addi    x12 , x0 , -6 
		bne     x28 , x12 , Fail 
Bigger_r:
		or      x18 , x23 , x7 
		xor     x28 , x23 , x7 
		sltiu   x28 , x28 , 22 
		sra     x28 , x28 , x2 
		addi    x12 , x0 , 20 
		bne     x28 , x12 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
