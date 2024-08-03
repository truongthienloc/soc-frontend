.text

#The program checks the ALU instruction in I_type

Main:
		addi    x31 , x0 , 194 
		addi    x8 , x0 , 193 
		sltu    x18 , x31 , x8 
		bltu    x31 , x8 , Less_i 
		bgeu    x31 , x8 , Bigger_i 
Less_i:
		ori     x29 , x31 , 114 
		sub     x28 , x8 , x31 
		srai    x28 , x28 , 3 
		and     x28 , x28 , x0 
		addi    x16 , x0 , 0 
		beq     x28 , x16 , Pass 
Bigger_i:
		ori     x29 , x31 , 68 
		sub     x28 , x8 , x31 
		srai    x28 , x28 , 2 
		and     x28 , x28 , x0 
		addi    x16 , x0 , 0 
		beq     x28 , x16 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
