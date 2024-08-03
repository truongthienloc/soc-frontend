.text

#The program checks the ALU instruction in I_type

Main:
		addi    x29 , x0 , 194 
		addi    x1 , x0 , 193 
		sltu    x30 , x29 , x1 
		bltu    x29 , x1 , Less_i 
		bgeu    x29 , x1 , Bigger_i 
Less_i:
		ori     x14 , x29 , 156 
		sub     x6 , x1 , x29 
		srai    x6 , x6 , 3 
		and     x6 , x6 , x0 
		addi    x26 , x0 , 0 
		beq     x6 , x26 , Pass 
Bigger_i:
		ori     x14 , x29 , 21 
		sub     x6 , x1 , x29 
		srai    x6 , x6 , 4 
		and     x6 , x6 , x0 
		addi    x26 , x0 , 0 
		beq     x6 , x26 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
