.text

#The program checks the ALU instruction in I_type

Main:
		addi    x29 , x0 , 190 
		addi    x18 , x0 , 189 
		sltu    x23 , x29 , x18 
		bltu    x29 , x18 , Less_i 
		bgeu    x29 , x18 , Bigger_i 
Less_i:
		ori     x20 , x29 , 149 
		sub     x12 , x18 , x29 
		srai    x12 , x12 , 2 
		and     x12 , x12 , x0 
		addi    x16 , x0 , 0 
		beq     x12 , x16 , Pass 
Bigger_i:
		ori     x20 , x29 , 14 
		sub     x12 , x18 , x29 
		srai    x12 , x12 , 3 
		and     x12 , x12 , x0 
		addi    x16 , x0 , 0 
		beq     x12 , x16 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
