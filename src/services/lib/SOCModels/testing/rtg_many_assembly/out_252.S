.text

#The program checks the ALU instruction in R_type

Main:
		addi    x25 , x0 , 121 
		addi    x19 , x0 , 22 
		addi    x12 , x0 , 65 
		addi    x16 , x0 , 25 
		addi    x3 , x0 , 0 
		blt     x25 , x19 , Less_r 
		bge     x25 , x19 , Bigger_r 
Less_r:
		sub     x28 , x12 , x16 
		and     x18 , x12 , x16 
		slti    x18 , x18 , 48 
		srl     x18 , x18 , x3 
		addi    x22 , x0 , 41 
		bne     x18 , x22 , Fail 
Bigger_r:
		or      x28 , x12 , x16 
		xor     x18 , x12 , x16 
		sltiu   x18 , x18 , 142 
		sra     x18 , x18 , x3 
		addi    x22 , x0 , 177 
		bne     x18 , x22 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
